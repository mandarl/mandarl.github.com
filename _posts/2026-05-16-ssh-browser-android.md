---
layout: post
title: "SSH Browser for Android: Routing Your Browser Through Your Own Server, Without a VPN"
date: 2026-05-16
description: "I built an Android app that replaces the ConnectBot + SocksDroid two-app combo with a single integrated browser. Here's how it works under the hood: SOCKS5 over JSch, AndroidX WebKit ProxyController, and Android Keystore credential storage."
excerpt: "The ConnectBot + SocksDroid two-app juggling act was my daily annoyance for years. So I built one app that does both. Here's how it works under the hood."
tags: [android, ssh, socks5, networking, security, mobile, kotlin]
---

For years I had a ritual every time I wanted to browse on my phone through my home server: open ConnectBot, connect to my SSH server, confirm the SOCKS proxy was up, switch to SocksDroid, activate the proxy, switch to Chrome, browse. Then later: reverse everything. The whole ceremony took about forty-five seconds and roughly the same number of taps.

I looked for a single app that handled both the SSH connection and the proxied browser together. I couldn't find one. So I built it.

**SSH Browser** connects to your SSH server, starts a local SOCKS5 proxy, and routes all in-app browser traffic through the tunnel — in a single tap. No VPN app, no root, no extra server configuration required.

## Why Not a VPN?

The obvious question. VPN tunneling is the standard approach for routing all phone traffic through a server you control, and it works. But it has friction:

- You need a VPN server process running (WireGuard, OpenVPN, etc.), not just an SSH daemon
- Android's VpnService requires a prominent system permission dialog every session
- It routes *all* traffic system-wide, which isn't always what you want

If you already have SSH access to a machine you control, you don't need any additional server setup. An SSH server can serve as a SOCKS5 proxy out of the box with `-D` flag dynamic port forwarding. That's the piece most Android solutions were missing: something that spoke SSH and proxied a browser, without the VPN overhead.

## How It Works

### The SSH Layer

The SSH connection is handled by [JSch](https://github.com/mwiede/jsch) — specifically the mwiede fork, which is actively maintained and handles modern SSH configurations cleanly. JSch establishes the connection and opens a dynamic port-forwarding tunnel on `localhost:1080`.

One thing I appreciated about JSch: the `setPortForwardingL` API is straightforward for SOCKS5 — you just tell it to bind a local port and it handles the SOCKS5 negotiation on the other end of the tunnel. No custom proxy server implementation needed.

```kotlin
session.setPortForwardingL(LOCAL_PROXY_PORT, "localhost", 0)
// JSch's local port forwarding with dynamic destination = SOCKS5 proxy
```

### The Browser Layer

This is where Android's API landscape gets interesting. The key is AndroidX WebKit's `ProxyController`:

```kotlin
ProxyController.getInstance().setProxyOverride(
    ProxyConfig.Builder()
        .addProxyRule("socks5://localhost:1080")
        .build(),
    executor,
    callback
)
```

`ProxyController` routes all WebView traffic through a specified proxy — no VpnService, no iptables rules, no root. It just works on Android 8.0+ (API 26), which is the minimum I targeted. The API is clean. The documentation, when I was building this, was sparse.

The key insight: because this is per-WebView routing, it only affects the in-app browser. Your other apps, Chrome, background services — they're all unaffected. This is a feature, not a bug. The scope is exactly what the user opted into.

### Credential Storage

Passwords and SSH private keys never touch the Room database. Everything credential-sensitive goes through `EncryptedSharedPreferences` backed by Android Keystore, which stores the AES-256-GCM key in hardware-backed storage on supported devices.

The database only stores server metadata: hostname, port, username, auth type, display name. If someone pulls the database file off an unencrypted device, there's nothing to decrypt — the keys aren't there.

### Host Key Verification

First connection to a new server triggers a TOFU (Trust On First Use) dialog: the app shows you the server's fingerprint and asks you to accept or reject. Accepted fingerprints are stored in a `host_keys` table in Room. Subsequent connections silently verify against the stored fingerprint. Known hosts files — the SSH way — translated into a mobile-appropriate flow.

## What Surprised Me

**ProxyController's scope was narrower than I expected — and that turned out to be the right answer.** My initial instinct was that routing only WebView traffic would feel like a half-measure. In practice, it's the right default. When you open SSH Browser and tap connect, you're making an explicit choice to browse through your server. Your podcast app shouldn't suddenly route through it because you forgot to disconnect.

**JSch's session lifecycle needed careful handling.** On mobile, processes get backgrounded, connections drop, devices sleep. The reconnection logic has to handle all of these gracefully without leaking port-forwarding sessions. I run a foreground service that holds the SSH session and a `ConnectionMonitor` that sends keepalives every 15 seconds — same pattern you'd use for any persistent connection on Android, but with a few SSH-specific wrinkles around detecting half-open TCP connections.

**The permission surface is genuinely minimal.** The app requests `INTERNET` and `FOREGROUND_SERVICE`. That's it. No VpnService dialog, no special network permissions, nothing about what sites you visit. That surprised me when I counted them up.

## Limitations Worth Knowing

This isn't a full VPN replacement — by design. Only traffic in the app's browser goes through the tunnel. System apps, other browsers, background sync, everything else goes direct. If you need system-wide routing, a proper VPN app is the right tool.

It also requires an SSH server you control. That means either a home server or a VPS. If you don't have one, this isn't for you.

iOS doesn't exist yet.

## Where It Lives

SSH Browser is on the Play Store in open beta: [app.sshbrowser](https://play.google.com/store/apps/details?id=app.sshbrowser.beta). Android 8.0+. Free, no account required.

The standard verification: connect to your server, browse to [whatismyip.com](https://whatismyip.com), confirm the IP matches your server rather than your device. That's the whole test.

I'm happy to answer questions about the implementation — the SSH session lifecycle, the WebKit proxy integration, credential storage, anything. Drop a comment below or find me on [Twitter/X](https://x.com/mandarlimaye).
