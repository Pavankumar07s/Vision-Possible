#ifndef TRIANGLE_H
#define TRIANGLE_H

#include "Point.h"

class Triangle {
public:
    Triangle(const Point& n1, const Point& n2, const Point& n3);
    Point getTriangulation(double d1, double d2, double d3) const;

private:
    Point node_1, node_2, node_3;
    double a, b, d, e;
    double sq(double v) const { return v * v; }
};

#endif // TRIANGLE_H
