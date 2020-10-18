export interface ChannelRoute {
  name: string;
  key?: string;
  tip?: string;
  children?: ChannelRoute[];
}

export const CHANNEL_ROUTES: ChannelRoute[] = [
  {
    name: '常用',
    key: 'favourite',
    children: [
      {
        name: '时间线'
      },
      {
        name: '综合版 1'
      }
    ]
  },
  {
    name: '综合',
    key: 'general',
    children: [
      {
        name: '时间线'
      },
      {
        name: '综合版 1'
      },
      {
        name: '速报 2',
        tip: 'New!'
      },
      {
        name: '欢乐恶搞'
      },
      {
        name: '脑洞 (推理)'
      },
      {
        name: '技术 (码农)'
      },
      {
        name: '旅行',
        tip: 'New!'
      },
      {
        name: '料理 (美食)'
      },
      {
        name: '询问 3'
      },
      {
        name: '围炉'
      },
      {
        name: '宠物'
      },
      {
        name: '喵版 (主子)'
      },
      {
        name: '音乐 (推歌)'
      },
      {
        name: '学业 (校园)'
      },
      {
        name: '社畜'
      },
      {
        name: '育儿'
      },
      {
        name: '科学 (理学)'
      },
      {
        name: '故事 (小说)'
      }, {
        name: '买买买 (剁手)'
      },
      {
        name: '绘画涂鸦 (创意)'
      },
      {
        name: '姐妹 1 (淑女)'
      },
      {
        name: '数码 (装机)'
      },
      {
        name: '女装 (时尚)'
      },
      {
        name: '日记 (树洞)'
      },
      {
        name: '都市怪谈 (灵异)'
      },
      {
        name: '跑团'
      }
    ]
  },
  {
    name: '二次元',
    key: 'acg',
    children: [{ name: '动画' }, { name: '漫画' }, { name: '特摄', tip: 'New!' }, { name: '虚拟偶像 (LL)' }, { name: '美漫 (小马)' }, { name: '国漫' }, { name: '轻小说' }, { name: '东方 Project' }, { name: '舰娘' }, { name: 'VOCALOID' }, { name: '文学 (推书)' }]
  }
];
