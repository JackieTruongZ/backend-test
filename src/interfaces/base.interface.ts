export interface IParamSearch {
    skip: number | undefined,
    limit: number | undefined,
    sort: string | undefined,
    keyword: string | undefined,
    tags: ITags[] | undefined
}

export interface ITags {
    name: string,
    field: any[]
}