export const topicTags: {
  [key: string]: {
    color: string
    tags: string[]
  }
} = {
  ecology: {
    color: '#A89376',
    tags: [
      '生態系',
      '水生生物',
      '魚類',
      '陸生動物',
      '節肢動物',
      '兩棲動物',
      '植物',
      '瀕危物種',
      '危險動物',
      '鳥類'
    ]
  },
  knowledge: {
    color: '#875B4A',
    tags: ['動物行為', '遷徒', '奇特行為', '攝影技巧']
  },
  geographicalFeatures: {
    color: '#B7AFA6',
    tags: [
      '野生動物保護區',
      '海洋',
      '溪河湖泊',
      '山林',
      '森林',
      '草原',
      '雪地',
      '沙漠',
      '海島',
      '沼澤'
    ]
  },
  style: {
    color: '#566E3D',
    tags: ['自然風景', '夜間攝影', '微距攝影', '野外探險', '地理風貌']
  },
  issue: {
    color: '#22577A',
    tags: ['環境保育', '全球生態', '嚴重議題']
  },
  geolocation: {
    color: '#F4B860',
    tags: ['非洲', '亞洲', '南美洲', '北美洲', '歐洲', '澳大利亞', '南極洲']
  }
}
export const setTagColor = (tag: string) => {
  for (const topic in topicTags) {
    if (topicTags[topic].tags.includes(tag)) {
      return topicTags[topic].color
    }
  }
}
