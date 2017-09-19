import React from "react";
import TextStyles from "../../assets/TextStyles";
import { connect } from "react-redux";
import Colors from "../../assets/Colors";
import Spinner from "react-native-loading-spinner-overlay";

const UnconnectedLoading = props => {
  const { loading } = props;

  return (
    <Spinner
      visible={loading}
      textStyle={TextStyles.h1White}
      color={Colors.backgroundWhite}
    />
  );
};

const mapStateToProps = ({ loading }) => loading;

const Loading = connect(mapStateToProps)(UnconnectedLoading);

export { Loading };
