import {Provider} from "react-redux";
import PosLayout from "../features/employee/pos/PosLayout";
import store from "../store";
import useInitialSync from "../features/employee/pos/useInitialSync";

function Pos() {
  return (
    <Provider store={store}>
      <PosLayout />
    </Provider>
  );
}

export default Pos;
