export interface SegmentModel {
  id: number; // 唯一标识
  cookie: string; // 饼干
  title?: string; // 标题
  channel: string; // 发串频道
  sage: boolean; // 是否已被 sage
  deleted: boolean; // 是否已被删除
  text: string; // 串首内容
  image: string; // 串首图片
  warning: string; // 警告信息(集中串、版规等)
  reply: string[]; // 回复ID(不含串首)
  createTime: number; // 发串时间
  updateTime: number; // 最近回复时间
  sageTime: number; // sage 时间
  deletedTime: number;// 删除时间
}

export interface ReplyModel {
  id: number; // 唯一标识
  cookie: string; // 饼干
  text: string; // 内容
  image: string; // 图片
  deleted: boolean; // 是否已被删除
  createTime: number; // 发串时间
  deletedTime: number;// 删除时间
}

export interface TipOffModel {
  id: number;
  cookie: string;
  segmentId?: number;
  replyId?: number;
  status: number; // 0: 未处理; 1: 已采纳; 2: 拒绝
}

export interface UserModel {
  id: number;
  cookie: string[];
  slot: number; // 饼干槽数
  email: string;
}
