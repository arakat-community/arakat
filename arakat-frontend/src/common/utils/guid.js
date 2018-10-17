export const guid = () => {
    return {
        uid: () => (((1+Math.random())*0x10000)|0).toString(16).substring(1).repeat(4)
    }
}