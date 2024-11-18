import { Platform, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

export const platformStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    ...Platform.select({
      web: {
        maxWidth: 1200,
        alignSelf: 'center',
        padding: 20,
      },
      default: {
        padding: 10,
      },
    }),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease',
        ':hover': {
          transform: 'translateY(-2px)',
        },
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
    }),
  },
  text: {
    ...Platform.select({
      web: {
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
      },
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  button: {
    borderRadius: 8,
    padding: 12,
    ...Platform.select({
      web: {
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        ':hover': {
          opacity: 0.8,
        },
      },
      default: {
        opacity: 1,
      },
    }),
  },
  responsiveGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: isWeb ? 'wrap' : 'nowrap',
  },
  responsiveColumn: {
    width: isWeb ? '33.33%' : '100%',
    padding: 8,
  },
  touchableArea: {
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
      default: {
        minHeight: 44,
        minWidth: 44,
      },
    }),
  },
  scrollView: {
    ...Platform.select({
      web: {
        overflowY: 'auto',
        '::-webkit-scrollbar': {
          width: 8,
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: 4,
        },
      },
      default: {
        flex: 1,
      },
    }),
  },
  modal: {
    ...Platform.select({
      web: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      },
      default: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 8,
      },
    }),
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    ...Platform.select({
      web: {
        outline: 'none',
        ':focus': {
          borderColor: '#2196F3',
        },
      },
      default: {
        paddingVertical: 8,
      },
    }),
  },
});

export const responsiveDimensions = {
  isSmallScreen: width < 768,
  isMediumScreen: width >= 768 && width < 1024,
  isLargeScreen: width >= 1024,
  isWeb,
  isMobile,
  width,
  height,
}; 