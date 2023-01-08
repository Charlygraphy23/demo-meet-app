
// @ts-expect-error
const peer = new window.Peer(undefined, {
    host: 'localhost',
    port: "9001",
    path: '/peer'
});

export {
    peer
}