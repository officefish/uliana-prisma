
const Midnight_Wishes = new Map<string, string[]>([
  ["mercury", [
    "mercury_1.jpg",
    "mercury_2.jpg",
    "mercury_3.jpg",
    "mercury_4.jpg",
  ]],
  ["venus", [
    "venus_1.jpg",
    "venus_2.jpg",
    "venus_3.jpg",
  ]],
  ["earth", [
    "earth_1.jpg",
    "earth_2.jpg",
    "earth_3.jpg",
    "earth_4.jpg",
    "earth_5.jpg",
    "earth_6.jpg",
  ]],
  ["mars", [
    "mars_1.jpg",
    "mars_2.jpg",
    "mars_3.jpg",
    "mars_4.jpg",
  ]],
  ["jupiter", [
    "jupiter_1.jpg",
    "jupiter_2.jpg",
    "jupiter_3.jpg",
    "jupiter_4.jpg",
  ]],
  ["saturn", [
    "saturn_1.jpg",
    "saturn_2.jpg",
    "saturn_3.jpg",
  ]],
  ["uranus", [
    "uranus_1.jpg",
    "uranus_2.jpg",
    "uranus_3.jpg",
    "uranus_4.jpg",
    "uranus_5.jpg",
  ]],
  ["neptune", [
    "neptune_1.jpg",
    "neptune_2.jpg",
    "neptune_3.jpg",
  ]],
  ["pluto", [
    "pluto_1.jpg",
    "pluto_2.jpg",
    "pluto_3.jpg",
    "pluto_4.jpg",
    "pluto_5.jpg",
  ]]
])

export function getActionBgSrcByKey(key: string) {
    const fragments = key.split(':')
    const type = fragments[0]
    const element = fragments[1]

    let src = '/fortunes/'

    if (type === "midnight_wish") {
        const variants = Midnight_Wishes.get(element)
        if (variants) {
            const variant =  variants[Math.floor(Math.random() * variants.length)]
            src += `midnight_wish/${variant}`
            return src
        }
    } else if (type === "bawdry") {
        // Randomly pick a wish
        //return `/images/bawdry/${Math.floor(Math.random() * 3) + 1}.jpg`
    }
    
    //return Midnight_Wishes.get(key)?.[Math.floor(Math.random() * Midnight_Wishes.get(key)?.length)] || "mercury_1.jpg"
}