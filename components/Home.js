import React from 'react';
import { StyleSheet,ScrollView,WebView,Dimensions, TouchableHighlight, Image,Platform, View, ActivityIndicator, FlatList, Text, Alert, YellowBox} from 'react-native';
import {DrawerNavigation} from 'react-navigation'
import cheerio from 'cheerio-without-node-native'


/*async function loadGraphicCards(page = 1) {
  const searchUrl = `https://www.amazon.de/s/?page=${page}&keywords=graphic+card`;
  const response = await fetch(searchUrl);      // fetch page 

  const htmlString = await response.text;     // get response text
  const $ = cheerio.load(htmlString);           // parse HTML string

  const liList = $("#s-results-list-atf > li"); // select result <li>s

  return $("#s-results-list-atf > li")             // select result <li>s
    .map((_, li) => ({                      // map to an list of objects
      asin: $(li).data("asin"),                   
      title: $("h2", li).text(),                
      price: $("span.a-color-price", li).text(),
      rating: $("span.a-icon-alt", li).text(),
      imageUrl: $("img.s-access-image").attr("src")
    }));
}*/

const REQUEST_URL = `'https://leadershipquotes.mystagingwebsite.com/wp-json/wp/v2/media';`;

const windowSize = Dimensions.get('window');


export default class HomeScreen extends React.Component{
  
  constructor(props) {

    super(props);
 
    this.state = {
 
      isLoading: true
 
    }
 
    YellowBox.ignoreWarnings([
     'Warning: componentWillMount is deprecated',
     'Warning: componentWillReceiveProps is deprecated',
   ]);
 
  }
  
 GetItem (title) {
   
  
  }
  
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }
 
  webCall=()=>{
 
   return fetch('https://public-api.wordpress.com/rest/v1.1/sites/rutacincohn.com/posts/')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSource: responseJson.posts
            }, function() {
              // In this block you can do something with new state.
            });
          })
          .catch((error) => {
            console.error(error);
          });
 
  }
 
  componentDidMount(){
 
   this.webCall();
 
  }
  
  render() {
 
    if (this.state.isLoading) {
      return (
 
       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
 
          <ActivityIndicator size="large" />
 
        </View>
        
      );
 
    }
  
    return (
  
     
      <View style={styles.MainContainer}>
  
        <FlatList
        
         data={ this.state.dataSource }
         
         ItemSeparatorComponent = {this.FlatListItemSeparator}
 
         renderItem={({item}) => 
         
             <View style={{flex:1, flexDirection: 'row'}}>
     
               <Image source = {{ uri: item.featured_image }} style={styles.imageView} />
             
               <Text onPress={this.GetItem.bind(this, item.title)} style={styles.textView} >{item.title}</Text>
 
             </View>
         
           }
 
         keyExtractor={(item, index) => index.toString()}
         
         />
  
      </View>
    );
  }
 }
  
 const styles = StyleSheet.create({
  
 MainContainer :{
  
     justifyContent: 'center',
     flex:1,
     margin: 5,
     marginTop: (Platform.OS === 'ios') ? 20 : 0,
  
 },
  
 imageView: {
 
     width: '50%',
     height: 100 ,
     margin: 7,
     borderRadius : 7
  
 },
  
 textView: {
 
     width:'50%', 
     textAlignVertical:'center',
     padding:10,
     color: '#000'
 }
  
 });
  /*state = {
    page: 0,
    items: [],
  };

  componentDidMount = () => this.loadNextPage();

  loadNextPage = () =>
    this.setState(async state => {
      const page = state.page + 1;
      const items = await loadGraphicCards(page);
      return {items, page};
    });

  render = () => (
    <ScrollView>
      {this.state.items.map(item => <Item {...item} key={item.asin}/>)}
    </ScrollView>
  );
}

const Item = props => (
  <TouchableOpacity onPress={() => alert("ASIN:" + props.asin)}>
    <Text>{props.title}</Text>
    <Image source={{uri: props.imageUrl}}/>
    <Text>{props.price}</Text>
    <Text>{props.rating}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });*/
  /*constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
    this.fetchData = this.fetchData.bind(this);
  }

  getInitialState() {
    return {
      // Card is initially set to null so that the loading message shows.
      card: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  // This is where the magic happens! Fetches the data from our API and updates the application state.
  fetchData() {
    this.setState({
      // We'll also set card to null when loading new cards so that the loading message shows.
      card: null,
    });
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        // this.setState() will cause the new data to be applied to the UI that is created by the `render` function below.
        this.setState({
          card: { pic: responseData[0].guid.rendered }
        });
      })
    .done();
  }

  // Instead of immediately rendering the template, we now check if there is data in the 'card' variable
  // and render a loading view if it's empty, or the 'card' template if there is data.
  render() {
    if ( !this.state.card ) {
      return this.renderLoadingView();
    }
    return this.renderCard();
  }

  // The loading view template just shows the message "Wait for it..."
  renderLoadingView() {
    return (
      < View style={styles.container}>
        < Text style={styles.text}>
          Wait for it...
        </Text>
      </View>
    );
  }

  // This is the original render function, now renamed to renderCard, which will render our main template. 
  renderCard() {
    let quote = this.state.card.pic;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          < Image style={{width: windowSize.width, height: windowSize.height}} source={{uri: this.state.card.pic}}  />
        
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#ccc'
            onPress={this.fetchData}
          >
            <Text style={styles.buttonText}>Next quote</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  imageContainer: {
    alignItems: 'center',
    flex: 1,
    width: windowSize.width,
    height: windowSize.height,
  },
  buttonContainer: {
    bottom: 0,
    flex: .1,
    width: windowSize.width,
    backgroundColor: '#1488BC',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
});*/


/*const styles = StyleSheet.create({
  container: {
     height: 350,
  }
})*/