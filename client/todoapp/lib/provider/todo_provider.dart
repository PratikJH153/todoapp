import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

const ENDPOINT_API = "https://fluttertodomongo.herokuapp.com";

class TodoProvider extends ChangeNotifier {
  final httpClient = http.Client();
  List<dynamic>? todoData = [];
  Map<String, String> customHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };

  Future fetchData() async {
    final Uri restAPIURL = Uri.parse("$ENDPOINT_API/getData");

    http.Response response = await httpClient.get(restAPIURL);
    final Map parsedData = await json.decode(response.body.toString());

    todoData = parsedData['data'];
  }

  Future addData(Map body) async {
    final Uri restAPIURL = Uri.parse("$ENDPOINT_API/add");

    http.Response response = await httpClient.post(
      restAPIURL,
      headers: customHeaders,
      body: jsonEncode(body),
    );

    return response.body;
  }

  Future deleteData(String id) async {
    final Uri restAPIURL = Uri.parse("$ENDPOINT_API/delete");

    http.Response response =
        await http.delete(restAPIURL, headers: customHeaders, body: {
      "id": id,
    });

    return response.body;
  }
}
