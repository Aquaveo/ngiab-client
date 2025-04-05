import { Fragment, useState, lazy,Suspense } from 'react';
import { HydroFabricProvider } from 'features/hydroFabric/providers/hydroFabricProvider';
import { ModelRunsProvider } from 'features/ModelRuns/providers/modelRunsProvider';
import { HydroFabricContainer, MapContainer } from '../../components/StyledContainers';
import { ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { GoGraph,GoChevronDown  } from "react-icons/go";
import LoadingAnimation from 'components/loader/LoadingAnimation';

const HydroFabricView = lazy(() => import('./hydroFabricView.js'));
const MapComponent = lazy(() => import('features/Map/components/mapgl.js'));
const ModelRunsView = lazy(() => import('features/ModelRuns/views/modelsView.js'));

const ToggleButton = styled(Button)`
  top: ${(props) => (props.fullScreen ? '95%' : '65%;')};
  right: 0px;
  position: absolute;
  transform: translate(-50%, -50%);
  background-color:rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  border-radius: 5px;
  padding: 7px 8px;
  z-index: 1001;
  
  &:hover, &:focus {
    background-color: rgba(0, 0, 0, 0.1)!important;
    color: white;
    border: none;
    box-shadow: none;
  }
`;


const NGIABView = () => {
  const [singleRowOn, toggleSingleRow] = useState(true);
  const [isModelRunListOpen, setIsModelRunListOpen] = useState(true);
  const [ isLoading, setIsLoading ] = useState(false);

  return (
    <Fragment>
        <ModelRunsProvider>
          <HydroFabricProvider>
            <ToastContainer stacked  />
            <ModelRunsView
              singleRowOn={singleRowOn}
              toggleSingleRow={toggleSingleRow}
              setIsLoading={setIsLoading}
              setIsModelRunListOpen={setIsModelRunListOpen}
            />
              <MapContainer 
                fullScreen={singleRowOn}
                
              >
                <MapComponent />
              </MapContainer>
              <HydroFabricContainer 
                fullScreen={singleRowOn} 
                isModelRunListOpen={isModelRunListOpen}  
              >
                <ToggleButton fullScreen={singleRowOn}  onClick={() => toggleSingleRow(prev => !prev)}>
                  {singleRowOn ? <GoGraph size={20} /> : <GoChevronDown size={20} />}
                </ToggleButton>
                <Suspense fallback={<LoadingAnimation />}>
                  <HydroFabricView 
                    toggleSingleRow = {toggleSingleRow} 
                    singleRowOn={singleRowOn} 
                    setIsLoading={setIsLoading} 
                  />
                </Suspense>
              </HydroFabricContainer>
          </HydroFabricProvider>
        </ModelRunsProvider>


    </Fragment>
  );
};

export default NGIABView;
