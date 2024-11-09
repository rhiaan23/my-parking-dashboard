import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";  // Updated import path
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Car, CarFront, AlertCircle } from 'lucide-react';

const ParkingDashboard = () => {
  // Mock data
  const [occupancyData] = useState([
    { time: '8 AM', occupied: 45 },
    { time: '9 AM', occupied: 75 },
    { time: '10 AM', occupied: 85 },
    { time: '11 AM', occupied: 90 },
    { time: '12 PM', occupied: 95 },
    { time: '1 PM', occupied: 88 },
    { time: '2 PM', occupied: 82 },
    { time: '3 PM', occupied: 78 },
    { time: '4 PM', occupied: 85 },
    { time: '5 PM', occupied: 70 },
  ]);

  const parkingLevels = [
    { id: 1, total: 50, occupied: 42, available: 8 },
    { id: 2, total: 45, occupied: 30, available: 15 },
    { id: 3, total: 55, occupied: 48, available: 7 },
  ];

  // Mock alerts
  const alerts = [
    { id: 1, message: "Level 2 entrance sensor maintenance required", time: "10 mins ago" },
    { id: 2, message: "High occupancy on Level 3", time: "25 mins ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">MyParking Dashboard</h1>
        <p className="text-gray-600">Real-time parking monitoring system</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spaces</p>
                <p className="text-2xl font-bold">150</p>
              </div>
              <Car className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Currently Occupied</p>
                <p className="text-2xl font-bold">120</p>
              </div>
              <CarFront className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Spots</p>
                <p className="text-2xl font-bold">30</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Occupancy Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Occupancy Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="occupied" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Section */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map(alert => (
                <div key={alert.id} className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{alert.message}</p>
                      <p className="text-xs text-red-600 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Parking Levels */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Parking Levels Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {parkingLevels.map(level => (
                <div key={level.id} className="bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-semibold mb-4">Level {level.id}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Spaces</span>
                      <span className="font-medium">{level.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Occupied</span>
                      <span className="font-medium text-red-600">{level.occupied}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available</span>
                      <span className="font-medium text-green-600">{level.available}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${(level.occupied / level.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParkingDashboard;