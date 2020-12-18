import { ChannelRoute } from '@/types';

export const COOKIES_KEY = 'ralph-nmb-cookies';
export const COOKIE_KEY = 'ralph-nmb-cookie';

export const CHANNEL_ROUTES: ChannelRoute[] = [
  {
    title: '常用',
    route: 'favourite',
    children: [
      {
        title: '时间线'
      },
      {
        title: '综合版 1'
      }
    ]
  },
  {
    title: '综合',
    route: 'general',
    children: [
      {
        title: '时间线'
      },
      {
        title: '综合版 1'
      },
      {
        title: '速报 2',
        tip: 'New!'
      },
      {
        title: '欢乐恶搞'
      },
      {
        title: '脑洞 (推理)'
      },
      {
        title: '技术 (码农)'
      },
      {
        title: '旅行',
        tip: 'New!'
      },
      {
        title: '料理 (美食)'
      },
      {
        title: '询问 3'
      },
      {
        title: '围炉'
      },
      {
        title: '宠物'
      },
      {
        title: '喵版 (主子)'
      },
      {
        title: '音乐 (推歌)'
      },
      {
        title: '学业 (校园)'
      },
      {
        title: '社畜'
      },
      {
        title: '育儿'
      },
      {
        title: '科学 (理学)'
      },
      {
        title: '故事 (小说)'
      }, {
        title: '买买买 (剁手)'
      },
      {
        title: '绘画涂鸦 (创意)'
      },
      {
        title: '姐妹 1 (淑女)'
      },
      {
        title: '数码 (装机)'
      },
      {
        title: '女装 (时尚)'
      },
      {
        title: '日记 (树洞)'
      },
      {
        title: '都市怪谈 (灵异)'
      },
      {
        title: '跑团'
      }
    ]
  },
  {
    title: '二次元',
    route: 'acg',
    children: [{ title: '动画' }, { title: '漫画' }, { title: '特摄', tip: 'New!' }, { title: '虚拟偶像 (LL)' }, { title: '美漫 (小马)' }, { title: '国漫' }, { title: '轻小说' }, { title: '东方 Project' }, { title: '舰娘' }, { title: 'VOCALOID' }, { title: '文学 (推书)' }]
  }
];

export enum TYPE_RACER_STATUS {
  RUNNING = 'RUNNING',
  FINISH = 'FINISH'
}
