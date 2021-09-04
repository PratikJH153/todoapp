import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:todoapp/provider/todo_provider.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final TextEditingController _titleController = TextEditingController();

  void addData() async {
    if (_titleController.text.trim() != "") {
      String title = _titleController.text.trim();
      Map<String, dynamic> todoData = {
        "title": title,
        "description": "$title DESC"
      };
      var response = await Provider.of<TodoProvider>(context, listen: false)
          .addData(todoData);

      print(response);
      setState(() {
        _titleController.clear();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: Container(
        padding: EdgeInsets.only(left: 40),
        child: Row(
          children: [
            Expanded(
              child: TextField(
                controller: _titleController,
              ),
            ),
            FloatingActionButton(
              onPressed: addData,
              backgroundColor: Colors.blueAccent,
              child: Icon(
                Icons.add,
                color: Colors.white,
              ),
            ),
          ],
        ),
      ),
      appBar: AppBar(
        title: Text("Todo App"),
        centerTitle: true,
      ),
      body: Container(
        child: Consumer<TodoProvider>(
          builder: (context, model, _) => FutureBuilder(
            future: model.fetchData(),
            builder: (context, AsyncSnapshot snapshot) {
              if (Provider.of<TodoProvider>(context, listen: false)
                  .todoData!
                  .isNotEmpty) {
                return ListView.builder(
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text(model.todoData![index]["title"]),
                      subtitle: Text(
                        model.todoData![index]["description"],
                      ),
                    );
                  },
                  itemCount: model.todoData!.length,
                );
              }
              return Center(
                child: CircularProgressIndicator(),
              );
            },
          ),
        ),
      ),
    );
  }
}
