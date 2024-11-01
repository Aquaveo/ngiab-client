

import {useEffect, Suspense, Fragment,lazy} from 'react';
import { useHydroFabricContext } from 'features/hydroFabric/hooks/useHydroFabricContext';
import appAPI from 'services/api/app';

import SelectComponent from './selectComponent';

// const SelectComponent = lazy(() => import('selectComponent'));

const CatchmentSelect = (props) => {
  const {state,actions} = useHydroFabricContext();

  useEffect(() => {
    if (!state.catchment.id) return;
    actions.reset_nexus();
    props.setIsLoading(true);
    var params = {
      catchment_id: state.catchment.id
    }
    appAPI.getCatchmentTimeSeries(params).then((response) => {
      actions.set_catchment_series(response.data);
      actions.set_catchment_variable_list(response.variables);
      actions.set_catchment_variable(null);
      actions.set_catchment_list(response.catchment_ids);
      actions.set_troute_id(state.catchment.id);
      props.toggleSingleRow(false);
      props.setIsLoading(false);
    }).catch((error) => {
      props.setIsLoading(false);
      console.log("Error fetching catchment time series", error);
    })
    return  () => {
      if (state.catchment.id) return;
      actions.reset_catchment();
    }

  }, [state.catchment.id]);


  useEffect(() => {
    if (!state.catchment.variable) return;
    props.setIsLoading(true);

    var params = {
      catchment_id: state.catchment.id,
      variable_column: state.catchment.variable
    }
    appAPI.getCatchmentTimeSeries(params).then((response) => {
      actions.set_catchment_series(response.data);
      props.toggleSingleRow(false);
      props.setIsLoading(false);
    }).catch((error) => {
      props.setIsLoading(false);
      console.log("Error fetching nexus time series", error);
    })
    return  () => {

    }

  }, [state.catchment.variable]);


  return (
    <Fragment>
          {state.catchment.id &&
            <Fragment>
              <h5>Catchment Metadata</h5>
              <p><b>ID</b>: {state.catchment.id}</p>
                <label>Current Catchment ID </label>
                <SelectComponent 
                  optionsList={state.catchment.list} 
                  onChangeHandler={actions.set_catchment_id} 
                  defaultValue={
                    {
                      'value': state.catchment.id,
                      'label': state.catchment.id
                    }
                  }
                />
              <label>Current Variable</label>
              <SelectComponent 
                optionsList={state.catchment.variable_list} 
                onChangeHandler={actions.set_catchment_variable}
                defaultValue={
                  {
                    'value': state.catchment.variable ? state.catchment.variable : state.catchment.variable_list ? state.catchment.variable_list[0].value : 'select variable',
                    'label': state.catchment.variable ? state.catchment.variable.toLowerCase().replace(/_/g, " ") : state.catchment.variable_list ? state.catchment.variable_list[0].label : 'select variable',
                  }

                }
              />
            </Fragment>
          }
    </Fragment>



  );
};

export default CatchmentSelect;