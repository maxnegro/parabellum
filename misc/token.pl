#!/usr/bin/perl

use strict;
use warnings;
use Text::CSV;
use Data::Dumper;

my $csv = Text::CSV->new ({sep_char => ";"});
$csv->column_names($csv->getline(*STDIN));

print "var mapPositions = {\n";
my $ID=0;
while (my $row=$csv->getline_hr(*STDIN)) {
    $row->{units0y}-=24;
    $row->{units1y}-=24;
    $row->{ships0y}-=24 if $row->{ships0x};
    $row->{ships1y}-=24 if $row->{ships0x};
    $row->{ships2y}-=24 if $row->{ships0x};
    $ID++;
    print "  $ID:{\n";
    print "        'units':[[$row->{units0x},$row->{units0y}],[$row->{units1x},$row->{units1y}]],\n";
    if ($row->{ships0x}) {
        print "        'ships':[[$row->{ships0x},$row->{ships0y}],[$row->{ships1x},$row->{ships1y}],[$row->{ships2x},$row->{ships2y}]],\n";
    }
    print "  },\n";
}
print "};\n";
print "\n";
