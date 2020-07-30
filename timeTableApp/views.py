from django.shortcuts import render
from django.contrib.auth.models import User ,auth
from .models import MyTable
from django.contrib import messages
from django.http import JsonResponse
import json
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
# Create your views here.

def homepage(request):
       return render(request,'loginpage.html')
def registerpage(request):
       return render(request,'register.html')

def login(request):
       if request.method == "POST":
           user_id = request.POST['user']
           password = request.POST['password']
           user = auth.authenticate(username=user_id,password=password)
           if user is not None:
                  auth.login(request,user)
                  if(MyTable.objects.filter(user_id=request.user).exists()):
                    tableData = MyTable.objects.get(user_id=user)
                    if tableData is not None:
                         tinfo =tableData.tableinfo
                         
                         return render(request,'timeTable.html',{"data":tinfo})
                  return render(request,'timeTable.html')
           else:
              messages.info(request,'no user')
              return render(request,'loginpage.html')
       return render(request,'loginpage.html')

   


def register(request):
       if request.method == "POST":
           user_id = request.POST['user']
           password = request.POST['password']
           if(User.objects.filter(username=user_id).exists()):
               messages.info(request,'username is alerdy taken')
               return render(request,'register.html')
           else:
            user = User.objects.create_user(username=user_id,password=password)
            user.save()
           
            return render(request,'loginpage.html')


@login_required(login_url='logpage')
def tableCreate(request):
           
           if request.is_ajax():
              data = request.POST['data'];
              if(MyTable.objects.filter(user_id=request.user).exists()):
                     tableData = MyTable.objects.get(user_id=request.user)
                     tableData.tableinfo=data
                     tableData.save()
                     return JsonResponse({
                     'msg':'Success'
                     })
              else:
                tableData= MyTable(tableinfo=data,user_id=request.user)
                tableData.save()
                return JsonResponse({
                  'msg':'Success'
                })

    
    

           return render(request,"timeTable.html")

@login_required(login_url='logpage')
def logoutPage(request):
        if request.is_ajax():
              data = request.POST['data'];
              if(MyTable.objects.filter(user_id=request.user).exists()):
                     tableData = MyTable.objects.get(user_id=request.user)
                     tableData.tableinfo=data
                     tableData.save()
                     logout(request)
                     return JsonResponse({
                     'msg':'Success'
                     })
                    
              else:
                tableData= MyTable(tableinfo=data,user_id=request.user)
                tableData.save()
                logout(request)
                return JsonResponse({
                     'msg':'Success'
                     })
              
       
        
       