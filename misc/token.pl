#!/usr/bin/perl

use strict;
use warnings;
use Text::CSV;
use Data::Dumper;

my %token;
my $csv = Text::CSV->new ({sep_char => ";"});

open (my $t, "<", "token.csv") or die "Can't open token.csv: $!";
$csv->column_names($csv->getline($t));
my $ID=0;
while (my $row=$csv->getline_hr($t)) {
    $row->{units0y}-=24;
    $row->{units1y}-=24;
    $row->{ships0y}-=24 if $row->{ships0x};
    $row->{ships1y}-=24 if $row->{ships0x};
    $row->{ships2y}-=24 if $row->{ships0x};
    $ID++;
    $token{$ID}={
        units => [
            [$row->{units0x},$row->{units0y}],
            [$row->{units1x},$row->{units1y}],
        ]
    };
    if ($row->{ships0x}) {
        $token{$ID}{ships}=[
            [$row->{ships0x},$row->{ships0y}],
            [$row->{ships1x},$row->{ships1y}],
            [$row->{ships2x},$row->{ships2y}],
        ]
    }
}
close $t;

open (my $b, "<", "borders.csv") or die "Can't open borders.csv: $!";
$csv->column_names($csv->getline($b));
while (my $row=$csv->getline_hr($b)) {
    $row->{x}-=61;
    $row->{y}-=31;
    $token{$row->{p1}}={} unless exists $token{$row->{p1}};
    $token{$row->{p1}}{borders}={} unless exists $token{$row->{p1}}{borders};
    $token{$row->{p1}}{borders}{$row->{p2}}=[$row->{x},$row->{y},$row->{a}]
}
close $b;

print "var mapPositions = {\n";
foreach $ID (sort keys %token) {
    print "  '$ID':{\n";
    if (exists $token{$ID}{units}) {
        print "        'units':[[$token{$ID}{units}[0][0],$token{$ID}{units}[0][1]],[$token{$ID}{units}[1][0],$token{$ID}{units}[1][1]]],\n";
    }
    if (exists $token{$ID}{ships}) {
        print "        'ships':[[$token{$ID}{ships}[0][0],$token{$ID}{ships}[0][1]],[$token{$ID}{ships}[1][0],$token{$ID}{ships}[1][1]],[$token{$ID}{ships}[2][0],$token{$ID}{ships}[2][1]]],\n";
    }
    if (exists $token{$ID}{borders}) {
        print "        'borders':{\n";
        foreach my $p2 (sort keys %{$token{$ID}{borders}}) {
            print "            '$p2':[$token{$ID}{borders}{$p2}[0],$token{$ID}{borders}{$p2}[1],$token{$ID}{borders}{$p2}[2]],\n";
        }
        print "        },\n";
    }
    print "  },\n";
}
print "};\n";
print "\n";
