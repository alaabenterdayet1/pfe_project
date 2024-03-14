import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user.dart';

class AuthService {
  static const baseUrl = 'http://10.0.2.2:8000/auth/';

  static Future<User?> getUser(String username) async {
    try {
      final response = await http.get(Uri.parse(baseUrl + 'getUser/' + username));

      if (response.statusCode == 200) {
        return User.fromJson(jsonDecode(response.body));
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  static Future<bool> registerUser(Map<String, dynamic> userData) async {
    try {
      final response = await http.post(
        Uri.parse(baseUrl + 'register'),
        body: jsonEncode(userData),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 201) {
        return true;
      } else {
        final errorMessage = jsonDecode(response.body)['error'];
        throw Exception(errorMessage);
      }
    } catch (error) {
      throw Exception('An error occurred during registration: $error');
    }
  }

  static Future<Map<String, dynamic>> loginUser(Map<String, dynamic> credentials) async {
    try {
      final response = await http.post(
        Uri.parse(baseUrl + 'login'),
        body: jsonEncode(credentials),
        headers: {'Content-Type': 'application/json'},
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        final errorMessage = jsonDecode(response.body)['error'];
        throw Exception(errorMessage);
      }
    } catch (error) {
      throw Exception('An error: $error');
    }
  }
}
