const days = Array.from({ length: 30 }, (_, i) => {
  const d = new Date('2025-03-01')
  d.setDate(d.getDate() + i)
  return d.toISOString().slice(0, 10)
})

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export const MOCK_VIEWS_SERIES = [
  { productId: '1', productName: 'Wireless Headphones', data: days.map((date) => ({ date, value: rand(80, 320) })) },
  { productId: '7', productName: 'Bluetooth Speaker',   data: days.map((date) => ({ date, value: rand(60, 200) })) },
  { productId: '11', productName: 'Mechanical Keyboard', data: days.map((date) => ({ date, value: rand(40, 180) })) },
]

export const MOCK_CART_ADDS = [
  { productId: '1',  productName: 'Wireless Headphones',  cartAdds: 142 },
  { productId: '2',  productName: 'Running Shoes',         cartAdds: 98  },
  { productId: '3',  productName: 'Organic Green Tea',     cartAdds: 87  },
  { productId: '7',  productName: 'Bluetooth Speaker',     cartAdds: 76  },
  { productId: '11', productName: 'Mechanical Keyboard',   cartAdds: 54  },
  { productId: '6',  productName: 'Yoga Mat',              cartAdds: 43  },
]

export const MOCK_CLICK_THROUGH = {
  clicks: 1284,
  conversions: 347,
  rate: 27.0,
}

export const MOCK_TOP_PRODUCTS = [
  { rank: 1, productId: '1',  productName: 'Wireless Headphones',  views: 6840, revenue: 11358.58 },
  { rank: 2, productId: '7',  productName: 'Bluetooth Speaker',    views: 4920, revenue: 2939.51  },
  { rank: 3, productId: '11', productName: 'Mechanical Keyboard',  views: 3780, revenue: 1635.00  },
  { rank: 4, productId: '2',  productName: 'Running Shoes',        views: 3210, revenue: 2322.00  },
  { rank: 5, productId: '10', productName: 'TypeScript Deep Dive', views: 2640, revenue: 1799.60  },
]
