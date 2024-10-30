export const MenuData = [
    {
        separator: true,
    },
    {
        title: "",
        children: [
            { title: "首页", icon: "solar:home-smile-broken", router: "/" },
        ]
    },
    {
        title: "发现",
        children: [
            { title: "发现", icon: "ph:magnifying-glass", router: "/discover", shortcut: '⌘+D', },
            { title: "歌单", icon: "streamline:song-recommendation", router: "/discover/songlist" },
        ]
    },
    {
        title: "设置",
        children: [
            { title: "设置", icon: "hugeicons:settings-03", router: "/setting" },
            { title: "主题", icon: "unjs:theme-colors", router: "/theme", shortcut: '⌘+Q' },
        ]
    },
]