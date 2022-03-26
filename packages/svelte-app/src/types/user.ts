export enum USER_ROLE {
  Anonymous,
  Common,
  Supervisor,
  Admin
}

export interface SprinkleRoute {
  name: string
  path: string
  component: string
  meta?: SprinkleRouteMeta
}

export interface SprinkleRouteMeta {
  auth?: boolean
  title?: string
  role?: USER_ROLE
}