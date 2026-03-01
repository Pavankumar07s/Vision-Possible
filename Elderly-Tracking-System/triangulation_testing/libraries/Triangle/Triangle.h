#ifndef TRIANGLE_H
#define TRIANGLE_H

#include "Point.h"

class Triangle {
public:
    Triangle(const Point& node_1, const Point& node_2, const Point& node_3); // Constructor
    Point getTriangulation(const double distance_1, const double distance_2, const double distance_3) const;

private:
    Point node_1, node_2, node_3;
    double a, b, d, e;

    double square(const double value) const;
};

#endif // TRIANGLE_H