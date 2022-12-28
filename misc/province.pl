#!/usr/bin/perl

use strict;
use warnings;
use Text::CSV;
use Data::Dumper;

my @barbarianNames=(
    undef,
    'Hibernia et Caledonia',
    'Germania Magna',
    'Sarmatia',
    'Iberia',
    'Regnum Parthicum',
    'Arabia',
    'Gaetulia',
);

my $csv = Text::CSV->new ({sep_char => ";"});
$csv->column_names($csv->getline(*STDIN));
my @barbarians;
print '$this->provinces = array('."\n";
while (my $row=$csv->getline_hr(*STDIN)) {
    print "  $row->{ID} => array(\n";
    print "    'name' => '$row->{name}',\n";
    print "    'support'  => $row->{support},\n";
    print "    'hasDocks' => $row->{hasDocks},\n";
    print "    'landBorders' => [$row->{landBorders}],\n";
    print "    'seaBorders' => [$row->{seaBorders}]\n";
    print "  ),\n";
    foreach my $b (split /,/,$row->{Barbarians}) {
        $barbarians[$b]=[] unless defined $barbarians[$b];
        push @{$barbarians[$b]},$row->{ID}
    }
}
print ");\n";
print "\n";
print '$this->barbarians = array('."\n";
foreach my $ix (1..@barbarians-1) {
    print "  $ix => array(\n";
    print "    'name' => '$barbarianNames[$ix]',\n";
    print "    'borders'  => [".join(',',@{$barbarians[$ix]})."],\n";
}
print ");\n";
print "\n";
