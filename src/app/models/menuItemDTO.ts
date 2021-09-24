export class MenuItemDTO {
    id:number
    idMenu: string
    displayName: string
    iconName:string
    route: string
    parentIdMenu: string
    idMenuItemUserGroup: number
    active: boolean
    subMenuItems: MenuItemDTO[]
    function: string
}