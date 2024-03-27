from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views
app_name = 'Hotel'

urlpatterns = [
    # Hotel
    path('', views.HotelList.as_view(),name='hotel'),
    path('create/', views.HotelCreate.as_view(),name='hotel'),
    path('<int:pk>/', views.HoTelDetailUpdate.as_view(),name='deltailcreate'),
    path('amenity/',views.AmenityList.as_view(),name = 'Amenity'),
    # RoomType
    path('room-type/',views.RoomTypeList.as_view(),name = 'Room Type List'),
    path('room-type/create/',views.RoomTypeCreate.as_view(),name = 'Room Type Create'),
    path('room-type/<int:pk>/',views.RoomTypeDetail.as_view(),name='RoomTypeDetails'),
    path('room-type/update/<int:pk>/',views.RoomTypeDetailUpdate.as_view(),name='RoomTypeDetails Update'),

    #Room
    path('room/',views.RoomList.as_view(),name='Room List'),
    path('room/create/',views.RoomListCreate.as_view(),name='Room Create'),
    path('room/<int:pk>/',views.RoomDetail.as_view(),name='Room Detail'),
    path('room/update/<int:pk>/',views.RoomDetailUpdate.as_view(),name='Room Detail Update'),
    path('room/available/', views.SearchAvailableRoomsView.as_view(),name='Available Room'),
    path('room/available/<int:pk>/', views.AvailableRoomsDetailsListView.as_view(),name='Available Room Detail'),
    #Booking
    path('booking/', views.BookingViewSet.as_view(),name='Booking API'),
    path('booking/<int:pk>/', views.BookingDetailViewSet.as_view(),name='Booking API Details'),
    path('booking/history/', views.BookingHistoryViewSet.as_view(),name='Booking API')

]

