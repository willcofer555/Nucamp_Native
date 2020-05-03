import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CAMPSITES } from '../shared/campsites';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';


const mapStateToProps = state => {
    return {
        campsites: state.campsites
    };
};


renderDirectoryItem = ({item}) => {
    return (
        <Tile
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('CampsiteInfo', { campsiteId: item.id })}
                    imageSrc={{uri: baseUrl + item.image}}
                />
    );
};

class Directory extends Component {


        render() {
            if (this.props.campsites.isLoading) {
                return <Loading />;
            }
            if (this.props.campsites.errMess) {
                return (
                    <View>
                        <Text>{this.props.campsites.errMess}</Text>
                    </View>
                );
            }
            return (
                <FlatList 
                data={this.props.campsites.campsites}
                renderItem={renderDirectoryItem}
                keyExtractor={item => item.id.toString()}
                />
            );

        }
    
}

export default connect(mapStateToProps)(Directory);