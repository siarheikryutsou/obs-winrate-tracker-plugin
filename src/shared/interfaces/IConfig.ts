export interface IConfigCheckboxes {
    useSaveButton: boolean
    showLastSaveInfo: boolean
}

export interface IConfig extends IConfigCheckboxes {
    fontFamily: string
    fontSize: number
    fontColor: string
}