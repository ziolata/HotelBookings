from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views
app_name = 'Hotel'

urlpatterns = [
    # path('<int:pk>/',PostDetail.as_view,name=detailcreate),
    # path('',PostList.as_view(),name='listcreate')
    path('', views.HotelList.as_view(),name='hotel'),
    path('<int:pk>/', views.HoTelDetail.as_view(),name='deltailcreate'),
    path('amenity/',views.AmenityList.as_view(),name = 'Amenity'),
    path('room-type/',views.RoomTypeList.as_view(),name = 'Room Type'),
    path('room-type/<int:pk>/',views.RoomTypeDetail.as_view(),name='RoomTypeDetails'),
    path('room/',views.RoomList.as_view(),name='Room'),
    path('room/<int:pk>/',views.RoomDetail.as_view(),name='Room'),

    # path('room/available/', views.AvailableRoomViewSet.as_view({'get': 'list'}),name='Available Room'),
    path('room/available/', views.SearchAvailableRoomsView.as_view(),name='Available Room'),
    path('room/available/<int:pk>/', views.AvailableRoomsDetailsListView.as_view(),name='Available Room Detail'),
    path('booking/', views.BookingViewSet.as_view(),name='Booking API'),
    path('booking/<int:pk>/', views.BookingDetailViewSet.as_view(),name='Booking API Details'),

    path('booking/history/', views.BookingHistoryViewSet.as_view(),name='Booking API')

]

