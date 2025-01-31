export default function showSticker({ playerId, stickerUrl }: { playerId: string, stickerUrl: string }) {
    let stickerElement = document.getElementById(`stickerElement_UserId_${playerId}`)
    if (!stickerElement) return

    let stickerImage = document.createElement('img')
    stickerImage.src = stickerUrl

    stickerElement.lastElementChild?.remove()
    stickerElement.appendChild(stickerImage)

    stickerElement.style.animation = 'NoAnimation'
    setTimeout(() => {
        stickerElement.style.animation = ''
    }, 10)

}