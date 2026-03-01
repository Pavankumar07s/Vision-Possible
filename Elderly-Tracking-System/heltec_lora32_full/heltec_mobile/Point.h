#ifndef POINT_H
#define POINT_H

class Point {
public:
    Point() : x(0), y(0) {}
    Point(double x, double y) : x(x), y(y) {}
    double getX() const { return x; }
    double getY() const { return y; }
private:
    double x, y;
};

#endif // POINT_H
