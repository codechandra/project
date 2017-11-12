var express=require('express');
var mysql=require('mysql');
var app=express();
var connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'sampleDB'
});
connection.connect(function(error){
  if(error){
  console.log("error");
}
  else {
    console.log("connected");
  }
});
app.get('/',function(req,res){
  var b="gopimouli";
  connection.query("INSERT INTO table1 (`id`, `name`) VALUES (NULL,?)",[b],function(error,rows,fields){
    if(error)
    {
      console.log("error");
    }
    else{
      res.send("Successfully inserted");
  }
  });
});
app.listen(3000);
