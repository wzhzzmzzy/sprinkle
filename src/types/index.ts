export interface Draft {
  title: string;
  content: string;
  image?: File;
}

export interface ChannelRoute {
  title: string;
  route?: string;
  icon?: string;
  tip?: string;
  children?: ChannelRoute[];
}

export interface LoadingStatus {
  replySubmit: boolean;
}

export interface ExpendStatus {
  [index: string]: boolean;
}

export interface ModalButtonProp {
  text: string;
  onClick: (e: Event) => never;
}

export interface SingleWord {
  passed: string;
  wrong: string;
  remain: string;
}

export * from './store';
export * from './model';
export * from './calendar';
