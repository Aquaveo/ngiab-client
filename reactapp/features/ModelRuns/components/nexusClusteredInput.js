import { useHydroFabricContext } from 'features/hydroFabric/hooks/useHydroFabricContext';
import { Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

// Create a styled switch component
const StyledSwitch = styled(Form.Switch)`
    margin-top: 10px;  
`;

const NexusClusteredInput = () => {
  const { state, actions } = useHydroFabricContext();

  const handleToggleNexusClustering = () => {
    actions.toggle_nexus_geometry_clusters();
  };
  const handleToggleNexusLayer = () => {
    actions.toggle_nexus_geometry_hidden();
  };
  const handleToggleCatchmentLayer = () => {
    actions.toggle_catchment_geometry_hidden();
  };

  return (
    <Fragment>
          <h5>Layers</h5>
          <StyledSwitch
            label="Nexus Layer"
            id="nexus-layer-switch"
            checked={!state.nexus?.geometry?.hidden ?? true}
            onChange={handleToggleNexusLayer}
            title="Toggle Nexus Layer visualization"
          />
          <StyledSwitch
            label="Nexus Clustering"
            id="nexus-clustering-switch"
            checked={state.nexus?.geometry?.clustered ?? false}
            onChange={handleToggleNexusClustering}
            title="Toggle nexus clustering visualization"
          />
          <StyledSwitch
            label="Catchment Layer"
            id="catchment-layer-switch"
            checked={!state.catchment?.geometry?.hidden ?? true}
            onChange={handleToggleCatchmentLayer}
            title="Toggle Catchment Layer visualization"
          />
    </Fragment>
  );
};

export default NexusClusteredInput;