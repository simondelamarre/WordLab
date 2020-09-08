export default interface ApiSetup {
    from: number,
    to: number,
    paging: string,
    params: { [x: string]: string },
    headers: { [x: string]: string }
}
