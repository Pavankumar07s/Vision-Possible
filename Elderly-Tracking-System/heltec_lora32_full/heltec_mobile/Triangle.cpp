#include "Triangle.h"

Triangle::Triangle(const Point& n1, const Point& n2, const Point& n3)
    : node_1(n1), node_2(n2), node_3(n3)
{
    a = 2.0 * n2.getX() - 2.0 * n1.getX();
    b = 2.0 * n2.getY() - 2.0 * n1.getY();
    d = 2.0 * n3.getX() - 2.0 * n2.getX();
    e = 2.0 * n3.getY() - 2.0 * n2.getY();
}

Point Triangle::getTriangulation(double d1, double d2, double d3) const {
    double c = sq(node_2.getX()) + sq(node_2.getY())
             - sq(node_1.getX()) - sq(node_1.getY())
             + sq(d1) - sq(d2);

    double f = sq(node_3.getX()) + sq(node_3.getY())
             - sq(node_2.getX()) - sq(node_2.getY())
             + sq(d2) - sq(d3);

    double denom = a * e - b * d;
    if (denom == 0.0) denom = 0.0001;  // avoid division by zero

    double x = (c * e - b * f) / denom;
    double y = (a * f - c * d) / denom;

    return Point(x, y);
}
