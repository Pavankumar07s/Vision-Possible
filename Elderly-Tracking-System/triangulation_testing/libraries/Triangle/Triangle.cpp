#include <iostream>
#include "Triangle.h"
using namespace std;

Triangle::Triangle(const Point& node_1, const Point& node_2, const Point& node_3) : node_1(node_1), node_2(node_2), node_3(node_3) {
    a = 2 * node_2.getX() - 2 * node_1.getX();
    b = 2 * node_2.getY() - 2 * node_1.getY();
    d = 2 * node_3.getX() - 2 * node_2.getX();
    e = 2 * node_3.getY() - 2 * node_2.getY(); 
}

double Triangle::square(const double value) const {
    return value * value;
}

Point Triangle::getTriangulation(const double distance_1, const double distance_2, const double distance_3) const {
   
    const double c = square(node_2.getX()) + square(node_2.getY()) - square(node_1.getX()) - square(node_1.getY()) + square(distance_1) - square(distance_2);
    const double f = square(node_3.getX()) + square(node_3.getY()) - square(node_2.getX()) - square(node_2.getY()) + square(distance_2) - square(distance_3);
   
    const double x = (c * d - b * f) / (a * e - b * d);
    const double y = (a * f - c * d) / (a * e - b * d);

    return Point(x, y);
}