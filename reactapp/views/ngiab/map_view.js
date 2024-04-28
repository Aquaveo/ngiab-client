import React, { Fragment, useEffect,useCallback } from 'react';
import appAPI from 'services/api/app';
import { useMapContext } from 'features/Map/hooks/useMapContext';
import { useHydroFabricContext } from 'features/hydroFabric/hooks/useHydroFabricContext';
import {createVectorLayer, createClusterVectorLayer} from 'features/Map/lib/mapUtils';
// import {displayFeatureInfo} from 'lib/mapEvents'
import { initialLayersArray } from 'lib/layersData';
import { makeNexusLayerParams, makeCatchmentLayer } from 'lib/mapUtils';


const MapView = ({props}) => {
  const {actions: mapActions } = useMapContext();
  const {state: hydroFabricState, actions: hydroFabricActions } = useHydroFabricContext(); 
  
  const nexusLayerParamsCallBack = useCallback(() => {
    return makeNexusLayerParams(hydroFabricActions);
  })

  const catchmentLayerCallBack = useCallback(() => {
    const catchmentLayersURL = 'http://localhost:8181/geoserver/wms'; 
    return makeCatchmentLayer(catchmentLayersURL,hydroFabricActions);
  })


  useEffect(() => {
    appAPI.getNexusGeoJson().then(response => {
        console.log(response)
        // Define the parameters for the layer
        var nexusLayerParams = nexusLayerParamsCallBack();
        var catchmentLayer = catchmentLayerCallBack();

        nexusLayerParams['geojsonLayer']=response.geojson;
        
        const nexusClusterLayer = createClusterVectorLayer(nexusLayerParams);

        mapActions.addLayer(nexusClusterLayer);
        mapActions.addLayer(catchmentLayer);
        
        
        hydroFabricActions.set_nexus_list(response.list_ids);

    }).catch(error => {
        console.log(error)
    })

    //adding layers
    initialLayersArray.forEach(layer => {
      mapActions.addLayer(layer);
    })
    // remove the layers wheen the component unmounts
    return () => {

      //delete added layers when unmounting
      initialLayersArray.forEach(layer => {
        mapActions.delete_layer_by_name(layer.options.name)
      })
      mapActions.delete_layer_by_name('Nexus Layer')
    }

  }, []);


  
  return (
    <Fragment>
    </Fragment>
  );
};

export default MapView;
