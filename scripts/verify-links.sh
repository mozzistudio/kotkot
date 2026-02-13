#!/bin/bash

# Script to verify all SEO navbar links work correctly
# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="https://kotkot.vercel.app"

echo "🔍 Vérification des liens de la navbar SEO..."
echo "================================================"
echo ""

# Counter
TOTAL=0
SUCCESS=0
FAILED=0

# Function to check URL
check_url() {
    local url=$1
    local name=$2
    TOTAL=$((TOTAL + 1))

    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$url")

    if [ "$HTTP_CODE" == "200" ]; then
        echo -e "${GREEN}✓${NC} $name ($url) - ${GREEN}OK${NC}"
        SUCCESS=$((SUCCESS + 1))
    else
        echo -e "${RED}✗${NC} $name ($url) - ${RED}FAILED (HTTP $HTTP_CODE)${NC}"
        FAILED=$((FAILED + 1))
    fi
}

echo "📋 Vérification des liens principaux..."
echo ""

# Main pages
check_url "$BASE_URL/" "Homepage"
check_url "$BASE_URL/seguros" "Hub Seguros"
check_url "$BASE_URL/seguros/aseguradoras" "Directory Aseguradoras"
check_url "$BASE_URL/blog" "Blog"
check_url "$BASE_URL/para-brokers" "Para Brokers"

echo ""
echo "🚗 Vérification des produits d'assurance..."
echo ""

# Insurance products
check_url "$BASE_URL/seguros/auto" "Seguro de Auto"
check_url "$BASE_URL/seguros/salud" "Seguro de Salud"
check_url "$BASE_URL/seguros/vida" "Seguro de Vida"
check_url "$BASE_URL/seguros/hogar" "Seguro de Hogar"
check_url "$BASE_URL/seguros/viaje" "Seguro de Viaje"
check_url "$BASE_URL/seguros/mascota" "Seguro de Mascota"
check_url "$BASE_URL/seguros/empresarial" "Seguro Empresarial"
check_url "$BASE_URL/seguros/responsabilidad-civil" "Responsabilidad Civil"
check_url "$BASE_URL/seguros/accidentes-personales" "Accidentes Personales"
check_url "$BASE_URL/seguros/ahorro" "Seguro de Ahorro"

echo ""
echo "🏢 Vérification des compagnies d'assurance..."
echo ""

# Insurance companies
check_url "$BASE_URL/seguros/aseguradoras/assa" "ASSA"
check_url "$BASE_URL/seguros/aseguradoras/mapfre" "MAPFRE"
check_url "$BASE_URL/seguros/aseguradoras/sura" "Sura"
check_url "$BASE_URL/seguros/aseguradoras/bupa" "Bupa"
check_url "$BASE_URL/seguros/aseguradoras/acerta" "Acerta"
check_url "$BASE_URL/seguros/aseguradoras/fedpa" "Fedpa"
check_url "$BASE_URL/seguros/aseguradoras/vivir-seguros" "Vivir Seguros"
check_url "$BASE_URL/seguros/aseguradoras/atlas" "Atlas"
check_url "$BASE_URL/seguros/aseguradoras/banistmo-seguros" "Banistmo Seguros"
check_url "$BASE_URL/seguros/aseguradoras/generali" "Generali"

echo ""
echo "🔗 Vérification des pages croisées (échantillon)..."
echo ""

# Cross pages (sample)
check_url "$BASE_URL/seguros/auto/assa" "Auto + ASSA"
check_url "$BASE_URL/seguros/salud/mapfre" "Salud + MAPFRE"
check_url "$BASE_URL/seguros/vida/sura" "Vida + Sura"
check_url "$BASE_URL/seguros/hogar/assa" "Hogar + ASSA"

echo ""
echo "🗺️ Vérification des fichiers SEO..."
echo ""

# SEO files
check_url "$BASE_URL/sitemap.xml" "Sitemap"
check_url "$BASE_URL/robots.txt" "Robots.txt"

echo ""
echo "================================================"
echo ""
echo -e "📊 ${YELLOW}Résultats:${NC}"
echo -e "   Total: $TOTAL liens"
echo -e "   ${GREEN}✓ Succès: $SUCCESS${NC}"
echo -e "   ${RED}✗ Échecs: $FAILED${NC}"

if [ $FAILED -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 Tous les liens fonctionnent correctement!${NC}"
    exit 0
else
    echo ""
    echo -e "${RED}⚠️  Certains liens ont échoué. Veuillez vérifier.${NC}"
    exit 1
fi
