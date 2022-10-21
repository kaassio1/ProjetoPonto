import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { AuthContext } from "../contexts/auth";

import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import AppAdmin from "./admin.routes";

function Routes() {
  const { signed, loading, user } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#131313" />
      </View>
    );
  }

  return signed ? (
    user.tipo === "usuario" ? (
      <AppRoutes />
    ) : (
      <AppAdmin />
    )
  ) : (
    <AuthRoutes />
  );
}

export default Routes;
