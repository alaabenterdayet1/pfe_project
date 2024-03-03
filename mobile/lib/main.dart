import 'package:flutter/material.dart';
import 'package:mobile/screens/users_screen.dart';


void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: UsersScreen(), // Affichez l'écran UsersScreen comme page d'accueil
    );
  }
}
