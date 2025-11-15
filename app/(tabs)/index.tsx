import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE, IMAGE_SIZE, POSTS, PROFILE, TABS } from '@/constants/data';
import { AntDesign, Feather, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import React, { memo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');
type HeaderProps = {
  headerHeight: Animated.AnimatedInterpolation<string | number>;
  headerImageOpacity: Animated.AnimatedInterpolation<number>;
  headerImageScale: Animated.AnimatedInterpolation<number>;
  headerTitleOpacity: Animated.AnimatedInterpolation<number>;
};

const Header = memo(
  ({
    headerHeight,
    headerImageOpacity,
    headerImageScale,
    headerTitleOpacity,
  }: HeaderProps) => (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      <Animated.Image
        source={{ uri: PROFILE.headerImage }}
        style={[
          styles.headerBackground,
          { opacity: headerImageOpacity},
        ]}
        resizeMode="cover"
      />

      <Animated.View
        style={[styles.headerOverlay, { opacity: headerImageOpacity }]}
      />

      <Animated.View
        style={[styles.headerTitleContainer, { opacity: headerTitleOpacity }]}
      >
        <Text style={styles.headerTitleText}>{PROFILE.name}</Text>
      </Animated.View>

      {/* Top-right action icons */}
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconButton}>
        <Feather name="settings" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <AntDesign name="qrcode" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
);

  //  STICKY TAB BAR

type StickyTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  postTabHeight: Animated.AnimatedInterpolation<string | number>;
};

const StickyTabs = memo(
  ({ activeTab, setActiveTab, postTabHeight }: StickyTabsProps) => (
    <Animated.View style={[styles.stickyTabBar, { top: postTabHeight }]}>
      <View style={styles.tabContainer}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>

            {/* Underline indicator */}
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  )
);

  //  PROFILE SECTION

const ProfileSection = memo(() => (
  <View style={styles.profileSection}>
    <View style={styles.profileHeader}>
      <Image source={{ uri: PROFILE.avatar }} style={styles.avatar} />

      <View style={styles.profileInfo}>
        <Text style={styles.name}>{PROFILE.name}</Text>
        <Text style={styles.username}>{PROFILE.username}</Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.moreButton}>
       <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
      </TouchableOpacity>
    </View>

    {/* Bio */}
    <View style={styles.bioSection}>
      <Text style={styles.bioIcon}>💬</Text>
      <Text style={styles.bioText}>{PROFILE.bio}</Text>
    </View>

    {/* Link */}
    <View style={styles.linkSection}>
      <Text style={styles.linkIcon}>🔗</Text>
      <Text style={styles.link} numberOfLines={1}>
        {PROFILE.link}
      </Text>
      <TouchableOpacity>
        <Text style={styles.seeMore}>See more</Text>
      </TouchableOpacity>
    </View>

    {/* Stats row */}
    <View style={styles.statsContainer}>
      {PROFILE.stats.map((stat, idx) => (
        <React.Fragment key={stat.label}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>

          {/* Divider only between items */}
          {idx < PROFILE.stats.length - 1 && <View style={styles.statDivider} />}
        </React.Fragment>
      ))}
    </View>
  </View>
));

  //  PHOTO GRID ITEM

const PhotoItem = memo(({ item }: { item: any }) => (
  <View style={[styles.photoContainer, { width: IMAGE_SIZE, height: IMAGE_SIZE }]}>
    <Image source={{ uri: item.image }} style={styles.photo} />

    {item.bookmarked && (
      <View style={styles.iconBadge}>
  <AntDesign name="pushpin" size={24} color="white" />
      </View>
    )}
    {item.stacked && (
      <View style={styles.iconBadge}>
     <Octicons name="stack" size={24} color="white" />
      </View>
    )}
  </View>
));

/* -------------------------------------------------------
   MAIN SCREEN COMPONENT
   ------------------------------------------------------- */

export default function ParallaxProfileScreen() {
  const [activeTab, setActiveTab] = useState('Posts');
  const scrollY = useRef(new Animated.Value(0)).current;

  /* -------------------------------------------------------
     ANIMATED VALUES
     ------------------------------------------------------- */

  // Parallax header shrink
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  // Sticky tabs slide upward
  const postTabHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [
      HEADER_MAX_HEIGHT + HEADER_SCROLL_DISTANCE  + 90 ,
      HEADER_MIN_HEIGHT,
    ],
    extrapolate: 'clamp',
  });

  // Fades header image on scroll
  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.3, 0],
    extrapolate: 'clamp',
  });

  // Pull-down zoom effect when overscrolling
  const headerImageScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.5, 1],
    extrapolate: 'clamp',
  });

  // Fades + moves profile section
  const profileOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });
  const profileTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  // Shows large title when header collapses
  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const filteredPosts = activeTab === 'Posts' ? POSTS : [];


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Parallax Header */}
      <Header
        headerHeight={headerHeight}
        headerImageOpacity={headerImageOpacity}
        headerImageScale={headerImageScale}
        headerTitleOpacity={headerTitleOpacity}
      />

      {/* Sticky Tabs */}
      <StickyTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        postTabHeight={postTabHeight}
      />

      {/* Main Scrollable Content */}
      <Animated.FlatList
        data={filteredPosts}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => <PhotoItem item={item} />}

        /* Track scroll for parallax logic */
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}

        /* Profile section sits above posts */
        ListHeaderComponent={() => (
          <Animated.View
            style={{
              opacity: profileOpacity,
              transform: [{ translateY: profileTranslateY }],
            }}
          >
            {/* Spacer so the profile section starts BELOW the header */}
            <View style={{ height: HEADER_MAX_HEIGHT }} />

            <ProfileSection />
          </Animated.View>
        )}

        ListFooterComponent={() => <View style={{ height: 100 }} />}
      />
    </SafeAreaView>
  );
}

  //  STYLES

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  /* HEADER */
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffffff',
  },
  headerBackground: {
    width: width,
    height: HEADER_MAX_HEIGHT,
    position: 'absolute',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  headerTitleContainer: {
    position: 'absolute',
    bottom: 15,
    left: 20,
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  headerIcons: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 30,
    right: 16,
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 50,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
  },

  /* STICKY TABS */
  stickyTabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 15,
    color: '#999',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#00CED1',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    width: '80%',
    height: 3,
    backgroundColor: '#00CED1',
    borderRadius: 2,
  },

  /* PROFILE SECTION */
  profileSection: {
    backgroundColor: '#f9f9f9ff',
    padding: 20,
    borderRadius: 24,
    position: 'relative',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  username: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    backgroundColor: '#00CED1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  moreButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonText: {
    fontSize: 20,
  },

  /* BIO */
  bioSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bioIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  bioText: {
    fontSize: 14,
    color: '#333',
  },

  /* LINK */
  linkSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  linkIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  link: {
    fontSize: 14,
    color: '#00CED1',
    flex: 1,
  },
  seeMore: {
    fontSize: 14,
    color: '#00CED1',
    fontWeight: '600',
  },

  /* STATS */
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#e0e0e0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e0e0e0',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },

  /* PHOTOS */
  photoContainer: {
    position: 'relative',
    top: 60,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  iconBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeIcon: {
    fontSize: 14,
  },

  /* POST GRID */
  flatListContent: {
    backgroundColor: '#fff',
  },
  columnWrapper: {
    paddingHorizontal: 16,
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 44,
  },
});
