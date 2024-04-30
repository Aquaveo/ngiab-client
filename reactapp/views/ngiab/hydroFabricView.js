

import React,{useEffect, Fragment} from 'react';

import HydroFabricLinePlot from '../../features/hydroFabric/components/hydroFabricLinePlot';
import { useHydroFabricContext } from 'features/hydroFabric/hooks/useHydroFabricContext';
import appAPI from 'services/api/app';
import SelectComponent from 'features/hydroFabric/components/selectComponent';


const HydroFabricView = (props) => {
  const {state,actions} = useHydroFabricContext();
  const title = `${state.catchment.id ? 'Catchment: '+ state.catchment.id.split('cat-')['1'] : 'Nexus: ' + state.nexus.id } Time Series`;
  const subtitle = `${state.catchment.id ? state.catchment.variable + ' vs Time' : 'Flow (CFS) vs Time'}`

  useEffect(() => {
    if (!state.nexus.id) return;
    var params = {
      nexus_id: state.nexus.id
    }    
    appAPI.getNexusTimeSeries(params).then((response) => {
      actions.set_nexus_series(response.data);
      actions.reset_catchment();
      props.toggleSingleRow(false);

    }).catch((error) => {
      console.log("Error fetching nexus time series", error);
    })
    return  () => {

    }

  }, [state.nexus.id]);


  useEffect(() => {
    if (!state.catchment.id) return;
    var params = {
      catchment_id: state.catchment.id
    }
    console.log(params)    
    appAPI.getCatchmentTimeSeries(params).then((response) => {
      console.log(response)
      actions.set_catchment_series(response.data);
      actions.set_catchment_variable_list(response.variables);
      actions.set_catchment_variable(response.variable);
      actions.set_catchment_list(response.catchment_ids);
      actions.reset_nexus();
      props.toggleSingleRow(false);

    }).catch((error) => {
      console.log("Error fetching nexus time series", error);
    })
    return  () => {

    }

  }, [state.catchment.id]);



  return (
    <Fragment>
      {state.catchment.id &&
        <Fragment>
          <label>Select/Look a Catchment ID </label>
          <SelectComponent optionsList={state.catchment.list} onChangeHandler={actions.set_catchment_id} />
          <label>Select a Variable</label>
          <SelectComponent optionsList={state.catchment.variable_list} onChangeHandler={actions.set_catchment_variable} />
        </Fragment>
      }
      {state.nexus.id &&
        <Fragment>
          <label>Select/Look a Nexus ID</label>
          <SelectComponent optionsList={state.nexus.list} onChangeHandler={actions.set_nexus_id} />
        </Fragment>
      }
      <HydroFabricLinePlot singleRowOn={props.singleRowOn} title={title} subtitle={subtitle} />

    </Fragment>



  );
};

export default HydroFabricView;
  