import { Dimensions, Platform } from "react-native";

const TABS = ['Posts', 'Clips', 'Tagged'];

// Posts for the grid
const POSTS = [
  { id: 1, image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400', bookmarked: true },
  { id: 2, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', stacked: true },
  { id: 3, image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400', bookmarked: true },
  { id: 4, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', stacked: true },
  { id: 5, image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400' },
  { id: 6, image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400', stacked: true },
  { id: 7, image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400' },
  { id: 8, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', stacked: true },
];

// Profile + header info
const PROFILE = {
  name: 'John Doe',
  username: 'John_doe',
  bio: 'Better things are coming !!',
  link: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUtdzpWHr2RzAFyCimnkR2oNnuwwn7RaqYEw&s',
  headerImage:"https://static.vecteezy.com/system/resources/previews/007/755/662/large_2x/closeup-of-nature-yellow-flower-on-blue-sky-background-under-sunlight-with-bokeh-and-copy-space-using-as-background-natural-plants-landscape-ecology-cover-page-concept-free-photo.jpg",
  stats: [
    { label: 'Posts', value: POSTS.length },
    { label: 'Followers', value: '12K' },
    { label: 'Following', value: '2K' },
  ],
};

const { width } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 220;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const IMAGE_SIZE = (width - 48) / 2;

export { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE, IMAGE_SIZE, POSTS, PROFILE, TABS };

