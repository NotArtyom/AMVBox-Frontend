import React from 'react';

import { Cards, Chart, CountryPicker} from './components'
import styles from './Tracker.module.css'
import { fetchData} from './api';

 class Tracker extends React.Component {
   state={
     data:{},
   };

   async componentDidMount (){
     const fetchedData = await fetchData();
      this.setState({data: fetchedData})
   }

   render () {
     const { data } = this.state;
     return (
       <div className={ styles.container }>
         <Cards data={data}/>
       </div>
     )
   }
 }

export default Tracker
