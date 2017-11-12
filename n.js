var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var app = express();
//var Pool=require('pg').Pool;
var mysql=require('mysql');

app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'views'));

app.use(morgan('combined'));
/*//app.use('/views/ui',express.static());
var config={
    user:'codechandra',
    database:'codechandra',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};*/
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
app.get('/hai/:id',function(req,res){
    var value=req.params.id;
    var m=value.split('$');
    var one=(m[0]);
    var two=(m[1]);
    var three=m[2];
    var four=m[3];
    connection.query('INSERT INTO customer(cname,cmail,cmobile,cpassword) VALUES ($1,$2,$3,$4)',[one,two,three,four],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else
       {

           res.send(one);
       }
   }) ;
});
app.get('/hai1/:id',function(req,res){
    var value=req.params.id;
    var m=value.split('$');
    var one=(m[0]);
    var two=(m[1]);
    var three=m[2];
    if(m[2]==1)
    {
         connection.query('SELECT cname,cmail,cmobile FROM customer WHERE (CMAIL=$1 AND CPASSWORD=$2)',[one,two],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else
       {
           res.send((JSON.stringify(result.rows)));
       }
   }) ;
    }
    else if(m[2]==2)
    {
        connection.query('SELECT *FROM seller1 where semail=$1',[one],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else
       {
           res.send(JSON.stringify(result.rows));
       }
   }) ;
    }
   /* pool.query('SELECT  customer(cname,cmail,cmobile,cpassword) VALUES ($1,$2,$3,$4)',[one,two,three,four],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else
       {

           res.send(one);
       }
   }) ;*/
});
app.get('/hello/:id',function(req,res){
    var value=req.params.id;
    var m=value.split('$');
    var one=(m[0]);
    var two=(m[1]);
    var three=m[2];
    var four=(m[3]);
    connection.query('INSERT INTO seller1(sname,semail,spassword,smobile) VALUES ($1,$2,$3,$4)',[one,two,three,four],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else
       {
           res.send(one);
       }
   }) ;
});
app.get('/hello2/:id',function(req,res){
    var value=req.params.id;
    var m=value.split('$');
    var one=(m[0]);
    var two=(m[1]);
    var three=m[2];
    var four=(m[3]);
    var five=m[4];
    connection.query('INSERT INTO property1(pid,ptype,parea,psize,pdescription) VALUES ($1,$2,$3,$4,$5)',[one,two,three,four,five],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else
       {
           res.send("Thank you");
       }
   }) ;
});
app.get('/update/:id',function(req,res){
    var value=req.params.id;
     var m=value.split('$');
    var one=(m[0]);
    var two=(m[1]);
    var three=m[2];
    var four=(m[3]);
        connection.query('UPDATE customer SET cname=$1,cmail=$2,cmobile=$3,cpassword=$4 WHERE cmail=$5',[one,two,three,four,two],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else
       {
           res.send("Thank you");
       }
   });


});
app.get('/bookproperty/:id',function(req,res){
    var value=req.params.id;
    connection.query('SELECT *FROM property1 where parea=$1',[value],function(err,result){
        if(err){
           res.status(500).send(err.toString());
       }
       else
       {
           res.send(result.rows);
       }

    });
});
app.get('/update1/:id',function(req,res){
    var value=req.params.id;
     var m=value.split('$');
    var one=(m[0]);
    var two=(m[1]);
    var three=m[2];
    var four=(m[3]);
        connection.query('UPDATE seller1 SET sname=$1,semail=$2,spassword=$3,smobile=$4 WHERE semail=$5',[one,two,three,four,two],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else
       {
           res.send("Thank you");
       }
   });


});
//var pool=new Pool(config);
//pool.connect();
app.get('/test-db',function(req,res){
   pool.query('SELECT *FROM article',function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else
       {
           res.send(JSON.stringify(result.rows));
       }
   }) ;
});
var count=0;
app.get('/', function (req, res) {
//  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
  //console.log("views:"+(++count));
  connection.query("SELECT *FROM table1",function(error,rows,fields){
    if(error)
    {
      console.log("error");
    }
    else{
      res.send(JSON.stringify(rows));
  }
});
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('ui/2017_5$largeimg04_May_2017_174117811.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '2017_5$largeimg04_May_2017_174117811.jpg'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 3000;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
