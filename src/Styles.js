/**
 * Styles. See React / React Native documentation for more.
 *
 * It's easier to maintain all styles in a single file than use them inline.
 *
 * @copyright Tampereen kaupunginkirjasto 2018-
 * @author Miika Koskela <koskela.miika.s@outlook.com>
 * @license MIT
 */
const Colors = {
  // Named PIKI etc. colors
  Blue: '#1E4E7E',
  Red: '#B42121',
  Orange: '#CC5E2C',
  DarkRed: '#84130F',
  LightBlue: '#D4E7EF',
  Grey: '#CFCFCF',
  LightGrey: '#EEEEEE',
  DarkGrey: '#A9A9A9',
  Green: '#019b18', // TODO: Change to some other green
  Dark: '#222222',
  Yellow: '#FFDF00',
  White: '#FFFFFF',
  Black: '#000000'
};

const Styles = {

  // Colors
  Colors: Colors,
  MenuButtonColor: Colors.White,
  NavigationTint: Colors.White,

  // Component styling //

  // Fonts
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },

  centerHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },

  subheading: {
    fontSize: 14
  },

  text: {
    paddingBottom: 15,
    fontSize: 15,
    textAlign: 'left'
  },

  // Collaborators / Help
  collaborator: {
    padding: 15,
    marginBottom: 15,
    resizeMode: 'contain',
    height: 60
  },

  collaboratorContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 15
  },

  // Navigator
  tabNavigator: {
    backgroundColor: Colors.White
  },

  // Containers
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.White
  },

  container: {
    flex: 2,    //Have possibly two lines of text
    padding: 15
  },

  containerNoPadding: {
    flex: 1
  },

  fabMenu: {
    backgroundColor: Colors.White
  },

  filterButton: {
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.LightGrey,
    borderBottomColor: Colors.Grey,
    borderBottomWidth: 0.5
  },

  shareFabButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  HeaderRightButtonContainer: {
    paddingRight: 15
  },

  NavigationButtonContainer: {
    paddingRight: 15
  },

  // BookList screen; a list of books and list items
  // A row in the list
  bookListRowItem: {
    flexDirection: 'row',
    borderBottomColor: Colors.LightGrey,
    borderBottomWidth: 0.5,
    padding: 15
  },

  itemInfoView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGrey,
    marginBottom: 15,
    paddingBottom: 15
  },

  // Cover image
  bookCoverImageView: {
    marginRight: 15,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  bookCoverImage: {
    width: 80,
    height: 110
  },

  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15
  },

  availabilityButton: {
    flex: 1
  },

  description: {
    flex: 1,
    padding: 15,
    fontSize: 13
  },

  details: {
    padding: 15
  },

  headingWithButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 15
  },

  // Modals
  modalContent: {
    flex: 1,
    margin: 30,
    backgroundColor: Colors.White,
    shadowColor: Colors.DarkGrey,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1.0
  },

  fabModalContent: {
    flex: 1
  },

  modalHeading: {
    fontSize: 18,
    padding: 15,
    backgroundColor: Colors.LightGrey,
    borderBottomColor: Colors.Grey,
    borderBottomWidth: 0.5,
    color: Colors.Black
  },

  // Button styles
  button: {
    flex: 0,
    height: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: Colors.Red
  },

  headerButton: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: Colors.Blue
  },

  navigationButton: {
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Colors.DarkGrey,
    marginBottom: 10
  },

  buttonText: {
    color: Colors.White,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '200'

  },

  spacer: {
    flex: 5
  },

  smallSpacer: {
    flex: 1
  },

  descriptionButton: {
    flex: 1
  },

  bookmarkContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },

  bookInfoView: {
    flex: 1,
    flexDirection: 'column'
  },

  rowItem: {
    padding: 15,
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGrey,
    backgroundColor: Colors.White
  },

  rowHeading: {
    fontSize: 16
  },

  // Taks

  taskRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.LightGrey
  },

  taskRowNumber: {
    fontSize: 16,
    color: Colors.DarkGrey
  },

  taskRowHeading: {
    fontSize: 18,
    padding: 15,
    backgroundColor: Colors.LightGrey,
    borderBottomColor: Colors.Grey,
    borderBottomWidth: 0.5
  },

  taskRowDescription: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  },

  taskDetailsContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 15,
    borderBottomColor: Colors.LightGrey,
    borderBottomWidth: 0.5
  },

  taskAddBooksInfo: {
    paddingBottom: 15
  },

  taskAddBooksContainer: {
    padding: 15
  },

  taskDescription: {
    flex: 1,
    paddingLeft: 15
  },

  taskActionContainer: {
  },

  taskNumContainer: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  picker: {
    flex: 0,
    borderColor: '#CFCFCF'

  },

  taskType: {
    paddingBottom: 20
  },

  taskInfoContainer: {
    flexDirection: 'row'
  },

  alternatives: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: Colors.LightGrey,
    padding: 15
  },

  alternativesAvailability: {
    padding: 15,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },

  alternativesContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  wrappingText: {
    flexWrap: 'wrap',
    flex: 1,
    paddingRight: 15
  },

  cancelTaskContainer: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.LightGrey,
    borderBottomWidth: 0.5
  }
};

export default Styles;
export { Colors };
