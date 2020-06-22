from django.shortcuts import render
from .models import *

# Create your views here.
def store(request):
    #prep the data to render
    products = Product.objects.all()
    context = {'products':products}
    return render(request, 'store/store.html', context)

def cart(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        #query object or create one (try-catch style)
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        #get all the orderItems with order as a parent
        items = order.orderitem_set.all()
    else:
        #placeholder empty list
        items = []
        order = {'get_cart_total':0, 'get_cart_items':0}

    context = {'items':items, 'order':order}
    return render(request, 'store/cart.html', context)

def checkout(request):
    if request.user.is_authenticated:
        customer = request.user.customer
        #query object or create one (try-catch style)
        order, created = Order.objects.get_or_create(customer=customer, complete=False)
        #get all the orderItems with order as a parent
        items = order.orderitem_set.all()
    else:
        #placeholder empty list
        items = []
        order = {'get_cart_total':0, 'get_cart_items':0}

    context = {'items':items, 'order':order}
    return render(request, 'store/checkout.html', context)
