import { BoxBoldIcon, NFTBoldIcon, TagBoldIcon } from '../components/icons';

export const adminRoutes = [
  {
    key: 'product',
    label: 'Product',
    subnav: [
      {
        key: 'products',
        label: 'List products',
      },
      {
        key: 'organizations',
        label: 'Organizations',
      },
      {
        key: 'authors',
        label: 'Authors',
      },
      {
        key: 'collections',
        label: 'Collections',
      },
      {
        key: 'models',
        label: 'Models',
      },
    ],
    icon: BoxBoldIcon,
  },
  // {
  //   key: 'theme',
  //   label: 'Theme',
  //   subnav: [
  //     {
  //       key: 'themes',
  //       label: 'Themes',
  //     },
  //     {
  //       key: 'pages',
  //       label: 'Pages',
  //     },
  //   ],
  //   icon: BoxBoldIcon,
  // },
  {
    key: 'tags',
    label: 'ID Tags',
    icon: TagBoldIcon,
  },
  {
    key: 'digitals',
    label: 'NFT',
    icon: NFTBoldIcon,
  },
];
